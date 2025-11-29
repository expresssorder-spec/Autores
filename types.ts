export interface Rule {
  id: string;
  keywords: string[];
  response: string;
  isActive: boolean;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface StoreSettings {
  storeName: string;
  fallbackMessage: string;
}

export type UserRole = 'admin' | 'user';

export interface UserStats {
  messagesAnswered: number;
  lastActive: Date;
}

export interface UserMetadata {
  country: string;
  ipAddress: string;
  deviceId: string; // Used as a proxy for MAC Address blocking
}

export interface User {
  id: string;
  role: UserRole;
  email: string;
  password: string; // In a real app, this would be hashed
  phoneNumber: string | null;
  isConnected: boolean;
  rules: Rule[];
  settings: StoreSettings;
  createdAt: Date;
  stats: UserStats;
  metadata: UserMetadata;
  isBlocked: boolean;
}