import { type User, type InsertUser, type Transaction, type InsertTransaction, type Form, type InsertForm, type Activity, type InsertActivity, type Task, type InsertTask } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;

  // Transaction methods
  getTransactions(): Promise<Transaction[]>;
  getTransactionsByAgent(agentId: string): Promise<Transaction[]>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;

  // Form methods
  getForms(): Promise<Form[]>;
  getFormsByAgent(agentId: string): Promise<Form[]>;
  createForm(form: InsertForm): Promise<Form>;
  updateFormStatus(id: string, status: string): Promise<Form | undefined>;

  // Activity methods
  getActivities(): Promise<Activity[]>;
  createActivity(activity: InsertActivity): Promise<Activity>;

  // Task methods
  getTasks(): Promise<Task[]>;
  getTasksByAgent(agentId: string): Promise<Task[]>;
  createTask(task: InsertTask): Promise<Task>;
  updateTaskStatus(id: string, completed: number): Promise<Task | undefined>;

  // Dashboard stats
  getDashboardStats(): Promise<{
    activeTransactions: number;
    pendingForms: number;
    teamMembers: number;
    monthlyRevenue: string;
  }>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private transactions: Map<string, Transaction>;
  private forms: Map<string, Form>;
  private activities: Map<string, Activity>;
  private tasks: Map<string, Task>;

  constructor() {
    this.users = new Map();
    this.transactions = new Map();
    this.forms = new Map();
    this.activities = new Map();
    this.tasks = new Map();
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Create sample users
    const sampleUsers: User[] = [
      {
        id: "1",
        username: "john.agent",
        password: "password123",
        name: "John Agent",
        role: "Senior Real Estate Agent",
        createdAt: new Date(),
      },
      {
        id: "2",
        username: "sarah.miller",
        password: "password123",
        name: "Sarah Miller",
        role: "Agent",
        createdAt: new Date(),
      },
      {
        id: "3",
        username: "robert.johnson",
        password: "password123",
        name: "Robert Johnson",
        role: "Junior Agent",
        createdAt: new Date(),
      },
    ];

    sampleUsers.forEach(user => this.users.set(user.id, user));

    // Create sample forms
    const sampleForms: Form[] = [
      {
        id: "form1",
        type: "Purchase Agreement",
        propertyAddress: "123 Oak Street",
        propertyCity: "Austin, TX",
        agentId: "1",
        status: "Pending Review",
        dueDate: new Date("2024-12-15"),
        createdAt: new Date(),
      },
      {
        id: "form2",
        type: "Inspection Report",
        propertyAddress: "456 Pine Avenue",
        propertyCity: "Dallas, TX",
        agentId: "2",
        status: "Completed",
        dueDate: new Date("2024-12-12"),
        createdAt: new Date(),
      },
      {
        id: "form3",
        type: "Listing Agreement",
        propertyAddress: "789 Maple Drive",
        propertyCity: "Houston, TX",
        agentId: "3",
        status: "Overdue",
        dueDate: new Date("2024-12-10"),
        createdAt: new Date(),
      },
    ];

    sampleForms.forEach(form => this.forms.set(form.id, form));

    // Create sample activities
    const sampleActivities: Activity[] = [
      {
        id: "activity1",
        description: "New transaction created for 123 Main St",
        type: "transaction",
        relatedId: "trans1",
        agentId: "1",
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      },
      {
        id: "activity2",
        description: "Purchase agreement submitted for Oak Valley Home",
        type: "form",
        relatedId: "form1",
        agentId: "2",
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      },
      {
        id: "activity3",
        description: "Inspection completed for Johnson Property",
        type: "inspection",
        relatedId: "form2",
        agentId: "3",
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      },
    ];

    sampleActivities.forEach(activity => this.activities.set(activity.id, activity));

    // Create sample tasks
    const sampleTasks: Task[] = [
      {
        id: "task1",
        title: "Review purchase agreement for Oak Valley property",
        priority: "High",
        dueDate: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now
        agentId: "1",
        completed: 0,
        createdAt: new Date(),
      },
      {
        id: "task2",
        title: "Schedule showing for Pine Avenue listing",
        priority: "Medium",
        dueDate: new Date(Date.now() + 18 * 60 * 60 * 1000), // 18 hours from now
        agentId: "2",
        completed: 0,
        createdAt: new Date(),
      },
      {
        id: "task3",
        title: "Follow up with Johnson family about inspection results",
        priority: "Low",
        dueDate: new Date("2024-12-18"),
        agentId: "3",
        completed: 0,
        createdAt: new Date(),
      },
    ];

    sampleTasks.forEach(task => this.tasks.set(task.id, task));
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id, createdAt: new Date() };
    this.users.set(id, user);
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async getTransactions(): Promise<Transaction[]> {
    return Array.from(this.transactions.values());
  }

  async getTransactionsByAgent(agentId: string): Promise<Transaction[]> {
    return Array.from(this.transactions.values()).filter(
      (transaction) => transaction.agentId === agentId,
    );
  }

  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const id = randomUUID();
    const transaction: Transaction = { ...insertTransaction, id, createdAt: new Date() };
    this.transactions.set(id, transaction);
    return transaction;
  }

  async getForms(): Promise<Form[]> {
    return Array.from(this.forms.values());
  }

  async getFormsByAgent(agentId: string): Promise<Form[]> {
    return Array.from(this.forms.values()).filter(
      (form) => form.agentId === agentId,
    );
  }

  async createForm(insertForm: InsertForm): Promise<Form> {
    const id = randomUUID();
    const form: Form = { ...insertForm, id, createdAt: new Date() };
    this.forms.set(id, form);
    return form;
  }

  async updateFormStatus(id: string, status: string): Promise<Form | undefined> {
    const form = this.forms.get(id);
    if (form) {
      form.status = status;
      this.forms.set(id, form);
      return form;
    }
    return undefined;
  }

  async getActivities(): Promise<Activity[]> {
    return Array.from(this.activities.values()).sort(
      (a, b) => b.createdAt!.getTime() - a.createdAt!.getTime()
    );
  }

  async createActivity(insertActivity: InsertActivity): Promise<Activity> {
    const id = randomUUID();
    const activity: Activity = { 
      ...insertActivity, 
      id, 
      createdAt: new Date(),
      agentId: insertActivity.agentId || null,
      relatedId: insertActivity.relatedId || null
    };
    this.activities.set(id, activity);
    return activity;
  }

  async getTasks(): Promise<Task[]> {
    return Array.from(this.tasks.values());
  }

  async getTasksByAgent(agentId: string): Promise<Task[]> {
    return Array.from(this.tasks.values()).filter(
      (task) => task.agentId === agentId,
    );
  }

  async createTask(insertTask: InsertTask): Promise<Task> {
    const id = randomUUID();
    const task: Task = { 
      ...insertTask, 
      id, 
      createdAt: new Date(),
      completed: insertTask.completed || 0
    };
    this.tasks.set(id, task);
    return task;
  }

  async updateTaskStatus(id: string, completed: number): Promise<Task | undefined> {
    const task = this.tasks.get(id);
    if (task) {
      task.completed = completed;
      this.tasks.set(id, task);
      return task;
    }
    return undefined;
  }

  async getDashboardStats(): Promise<{
    activeTransactions: number;
    pendingForms: number;
    teamMembers: number;
    monthlyRevenue: string;
  }> {
    const activeTransactions = Array.from(this.transactions.values()).filter(
      (t) => t.status === "active"
    ).length;
    
    const pendingForms = Array.from(this.forms.values()).filter(
      (f) => f.status === "Pending Review" || f.status === "Overdue"
    ).length;

    const teamMembers = this.users.size;

    return {
      activeTransactions: 24, // Static value for demo
      pendingForms,
      teamMembers,
      monthlyRevenue: "$485K",
    };
  }
}

export const storage = new MemStorage();
