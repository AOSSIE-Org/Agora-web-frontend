import { Routes } from '@angular/router';

import { HomeComponent } from '../../components/home/home.component';
import { AboutComponent } from '../../components/about/about.component';
import { HelpComponent } from '../../components/help/help.component';
import { SigninComponent } from '../../components/signin/signin.component';
import { SignupComponent } from '../../components/signup/signup.component';
import { ProfileComponent } from '../../components/admin/profile/profile.component';
import { DashboardComponent } from '../../components/admin/dashboard/dashboard.component';
import { AuthGuard } from '../../auth/auth.guard';
import { ActivateAccountComponent } from '../../components/activate-account/activate-account.component';
import { ElectionFormOneComponent } from '../../components/admin/election-forms/election-form-one/election-form-one.component';
import { ElectionFormTwoComponent } from '../../components/admin/election-forms/election-form-two/election-form-two.component';
import { ElectionFormThreeComponent } from '../../components/admin/election-forms/election-form-three/election-form-three.component';
import { ElectionFormFourComponent } from '../../components/admin/election-forms/election-form-four/election-form-four.component';
import { ElectionFormFiveComponent } from '../../components/admin/election-forms/election-form-five/election-form-five.component';
import { CreateElectionComponent } from '../../components/admin/election/create-election/create-election.component';
import { EditElectionComponent } from '../../components/admin/election/edit-election/edit-election.component';
import { VotersComponent } from '../../components/admin/election/voters/voters.component';
import { ElectionComponent } from '../../components/admin/election/election/election.component';
import { VoteComponent } from '../../components/admin/election/vote/vote.component';
import { PreferencialBallotComponent } from '../../components/admin/election/vote/preferencial-ballot/preferencial-ballot.component';
import { RankBallotComponent } from '../../components/admin/election/vote/rank-ballot/rank-ballot.component';
import { ApprovalBallotComponent } from '../../components/admin/election/vote/approval-ballot/approval-ballot.component';
import { ScoreBallotComponent } from '../../components/admin/election/vote/score-ballot/score-ballot.component';
import { ForgotPasswordComponent } from '../../components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from '../../components/reset-password/reset-password.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'help', component: HelpComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'reset-password/:token', component: ResetPasswordComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'vote/:id/:pass', component: VoteComponent,
        children: [
        { path: 'preference', component: PreferencialBallotComponent},
        { path: 'rank', component: RankBallotComponent},
        { path: 'score', component: ScoreBallotComponent},
        { path: 'approval', component: ApprovalBallotComponent},
    ]},
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'election/:id/voters', component: VotersComponent, canActivate: [AuthGuard] },
    {
        path: 'election/create', component: CreateElectionComponent, canActivate: [AuthGuard],
        children: [
            { path: 'form1', component: ElectionFormOneComponent },
            { path: 'form2', component: ElectionFormTwoComponent },
            { path: 'form3', component: ElectionFormThreeComponent },
            { path: 'form4', component: ElectionFormFourComponent },
            { path: 'form5', component: ElectionFormFiveComponent }
        ]
    },
    { path: 'election/:id', component: ElectionComponent, canActivate: [AuthGuard] },
    {
        path: 'election/edit/:id', component: EditElectionComponent, canActivate: [AuthGuard],
        children: [
            { path: 'form1', component: ElectionFormOneComponent },
            { path: 'form2', component: ElectionFormTwoComponent },
            { path: 'form3', component: ElectionFormThreeComponent },
            { path: 'form4', component: ElectionFormFourComponent },
            { path: 'form5', component: ElectionFormFiveComponent }
        ]
    },
    { path: 'activate/:token', component: ActivateAccountComponent }];

export const routingComponents = [
    HomeComponent, AboutComponent,
    HelpComponent, SigninComponent,
    SignupComponent, DashboardComponent,
    ActivateAccountComponent, ProfileComponent,
    CreateElectionComponent,
    EditElectionComponent,
    ElectionFormOneComponent,
    ElectionFormTwoComponent,
    ElectionFormThreeComponent,
    ElectionFormFourComponent,
    ElectionFormFiveComponent,
    VotersComponent,
    ElectionComponent,
    VoteComponent,
    PreferencialBallotComponent,
    RankBallotComponent,
    ApprovalBallotComponent,
    ScoreBallotComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
];

