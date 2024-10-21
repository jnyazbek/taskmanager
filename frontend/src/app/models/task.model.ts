export class Task {
    id?: number;
    title!: string;
    priority!: number | null;
    completed!: boolean;
    isEditing?: boolean = false; 
  }
  