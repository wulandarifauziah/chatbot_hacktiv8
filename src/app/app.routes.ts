import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { Chatbot } from './pages/chatbot/chatbot';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'chatbot', component: Chatbot },
  { path: '**', redirectTo: '' }
];
