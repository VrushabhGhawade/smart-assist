import { Routes } from '@angular/router';
import { EnduserHomePage } from './component/feature/enduser/enduser-home-page/enduser-home-page';
import { Enduser } from './component/feature/enduser/enduser';
import { EnduserCreateTicket } from './component/feature/enduser/enduser-create-ticket/enduser-create-ticket';
import { EnduserMyTickets } from './component/feature/enduser/enduser-my-tickets/enduser-my-tickets';
import { EnduserTrackTicket } from './component/feature/enduser/enduser-track-ticket/enduser-track-ticket';
import { EnduserAiAssistent } from './component/feature/enduser/enduser-ai-assistent/enduser-ai-assistent';
import { LiveChat } from './component/feature/enduser/live-chat/live-chat';
import { PageNotFound } from './component/feature/page-not-found/page-not-found';
import { Login } from './component/feature/login/login';
import { canComponentDeactivateGuard } from './Guard/can-component-deactivate-guard';
import { authGuard } from './Guard/auth-guard';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: 'enduser',
        component: Enduser, canActivate: [authGuard],
        children: [
            { path: 'home-page', component: EnduserHomePage },
            {
                path: 'create-ticket', component: EnduserCreateTicket,
                canDeactivate: [canComponentDeactivateGuard]
            },
            { path: 'my-tickets', component: EnduserMyTickets, canActivate: [authGuard] },
            { path: 'track-ticket', component: EnduserTrackTicket },
            { path: 'ai-assistent', component: EnduserAiAssistent, canActivate: [authGuard] },
            { path: 'live-chat', component: LiveChat, canActivate: [authGuard] },
            { path: '', redirectTo: 'home-page', pathMatch: 'full'}
        ]
    },
    { path: '**', component: PageNotFound }
];
