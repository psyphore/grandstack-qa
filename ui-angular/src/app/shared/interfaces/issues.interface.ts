import { Person } from './person.interface';

export interface Issue {
    id: number;
    summary: string;
    description: string;
    link: string;
    person: string;
    status: string;
    points: number;
}

export interface IssueUpdate {
    id: string;
    created_at: string;
    updated_at: string;
}

export interface IssueUpdateResponse {
    issue: IssueUpdate;
}

export interface IssueResponse {
    issue: Issue;
}

export interface IssuesResponse {
    issues: Issue[];
}