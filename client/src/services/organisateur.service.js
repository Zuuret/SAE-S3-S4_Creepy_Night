import data from '@/datasource/data.js';

export async function getAllOrganisateurs() {
    return { error: 0, data: data.organisateurs }; 
}

export async function getAllPrestataires() {
    return { error: 0, data: data.prestataires };
}