import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertFormSchema, insertTaskSchema, insertActivitySchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Dashboard stats endpoint
  app.get("/api/dashboard/stats", async (req, res) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  });

  // Users endpoints
  app.get("/api/users", async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  // Forms endpoints
  app.get("/api/forms", async (req, res) => {
    try {
      const forms = await storage.getForms();
      const users = await storage.getAllUsers();
      
      // Enrich forms with agent data
      const enrichedForms = forms.map(form => {
        const agent = users.find(u => u.id === form.agentId);
        return {
          ...form,
          agent: agent ? {
            id: agent.id,
            name: agent.name,
            initials: agent.name.split(' ').map(n => n[0]).join(''),
          } : null,
        };
      });
      
      res.json(enrichedForms);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch forms" });
    }
  });

  app.post("/api/forms", async (req, res) => {
    try {
      const validatedData = insertFormSchema.parse(req.body);
      const form = await storage.createForm(validatedData);
      res.json(form);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid form data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create form" });
      }
    }
  });

  app.patch("/api/forms/:id/status", async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }
      
      const form = await storage.updateFormStatus(id, status);
      if (!form) {
        return res.status(404).json({ message: "Form not found" });
      }
      
      res.json(form);
    } catch (error) {
      res.status(500).json({ message: "Failed to update form status" });
    }
  });

  // Activities endpoints
  app.get("/api/activities", async (req, res) => {
    try {
      const activities = await storage.getActivities();
      res.json(activities);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch activities" });
    }
  });

  app.post("/api/activities", async (req, res) => {
    try {
      const validatedData = insertActivitySchema.parse(req.body);
      const activity = await storage.createActivity(validatedData);
      res.json(activity);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid activity data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create activity" });
      }
    }
  });

  // Tasks endpoints
  app.get("/api/tasks", async (req, res) => {
    try {
      const tasks = await storage.getTasks();
      const users = await storage.getAllUsers();
      
      // Enrich tasks with agent data
      const enrichedTasks = tasks.map(task => {
        const agent = users.find(u => u.id === task.agentId);
        return {
          ...task,
          agent: agent ? {
            id: agent.id,
            name: agent.name,
            initials: agent.name.split(' ').map(n => n[0]).join(''),
          } : null,
        };
      });
      
      res.json(enrichedTasks);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tasks" });
    }
  });

  app.post("/api/tasks", async (req, res) => {
    try {
      const validatedData = insertTaskSchema.parse(req.body);
      const task = await storage.createTask(validatedData);
      res.json(task);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid task data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create task" });
      }
    }
  });

  app.patch("/api/tasks/:id/status", async (req, res) => {
    try {
      const { id } = req.params;
      const { completed } = req.body;
      
      if (completed === undefined) {
        return res.status(400).json({ message: "Completed status is required" });
      }
      
      const task = await storage.updateTaskStatus(id, completed);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      
      res.json(task);
    } catch (error) {
      res.status(500).json({ message: "Failed to update task status" });
    }
  });

  // Team performance endpoint (mock data for demo)
  app.get("/api/team/performance", async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      const performance = users.map((user, index) => ({
        id: user.id,
        name: user.name,
        role: user.role,
        initials: user.name.split(' ').map(n => n[0]).join(''),
        transactions: [8, 6, 4][index] || 2,
        revenue: ['$2.4M', '$1.8M', '$1.2M'][index] || '$800K',
      }));
      
      res.json(performance);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch team performance" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
