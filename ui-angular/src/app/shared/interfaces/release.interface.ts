import { Person } from './person.interface';
import { Issue } from './issues.interface';

export interface Release {
    id: string;
    projectName: string;
    releaseName: string;
    customer: string;
    issues: Issue[];
    system: string;
    environment: string;
    status: string;
    attachments: any[];
    person: Person;
}

export interface ReleaseUpdate {
    id: string;
    created_at: string;
    updated_at: string;
}

export interface ReleaseResponse {
    release: Release;
}

export interface ReleasesResponse {
    releases: Release[];
}

export interface ReleaseUpdateResponse {
    release: ReleaseUpdate;
}