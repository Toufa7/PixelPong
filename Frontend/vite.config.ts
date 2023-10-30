import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export const API_BASE_URL = 'http://localhost:9000';

// import { API_BASE_URL } from './config.js';
// await fetch(`${API_BASE_URL}/users`);


export default defineConfig({
	plugins: [react()],
	// server: {
	// 	host: "pixelpong",
	// 	port: 9090,
	// }
})
