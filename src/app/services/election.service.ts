import { Injectable } from '@angular/core';
import { Election } from '../model/election.model';
import { BehaviorSubject, observable, Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { JwtService } from './jwt.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ElectionData } from '../model/electionData.model';
import { Voter } from '../model/voter.model';
import { Ballot } from '../model/ballot.model';
import { Winner } from '../model/winner.model';

@Injectable({
  providedIn: 'root'
})
export class ElectionService {
  private rootUrl = environment.API_URL;

  getheadersNoAuth() {
    let headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Token' : '',
      'No-Auth': 'True'
    };
    return headerDict;
  }

  getheadersWithAuth() {
    let headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
    };
    return headerDict;
  }

  private currentElectionsSubject = new BehaviorSubject<Election[]>({} as Election[]);
  private currentElectionsReplaySubject = new ReplaySubject<Election[]>(1);
  public currentElections = this.currentElectionsSubject.asObservable().pipe(distinctUntilChanged());
  public currentElectionsObserve = this.currentElectionsReplaySubject.asObservable();



  constructor(private http: HttpClient) { }

  getElections(): Observable<Election[]>{
    let reqHeaders = { headers: new HttpHeaders(this.getheadersWithAuth()) };
    return this.http.get<any>(this.rootUrl + '/election', reqHeaders).pipe(map(data => {
      let elections: Election[] = new Array();
      data.elections.map(value => elections.push(new Election().deserialize(value)));
      this.setElections(elections);
      return elections;
    }));
  }

  getElection(id: string) {
    let reqHeaders = { headers: new HttpHeaders(this.getheadersWithAuth()) };
    return this.http.get<Election>(this.rootUrl + '/election/' + id, reqHeaders).pipe(map(data => {
      return new Election().deserialize(data);
    }));
  }

  create(election: ElectionData) {
    let reqHeaders = { headers: new HttpHeaders(this.getheadersWithAuth()) };
    let body = JSON.stringify(election);
    return this.http.post(this.rootUrl + '/election', body, reqHeaders);
  }

  update(id: string, election: ElectionData) {
    let reqHeaders = { headers: new HttpHeaders(this.getheadersWithAuth()) };
    let body = JSON.stringify(election);
    return this.http.post(this.rootUrl + '/election/' + id, body, reqHeaders);
  }

  delete(id: string) {
    let reqHeaders = { headers: new HttpHeaders(this.getheadersWithAuth()) };
    return this.http.delete(this.rootUrl + '/election/' + id, reqHeaders);
  }

  getVoters(id: string) {
    let reqHeaders = { headers: new HttpHeaders(this.getheadersWithAuth()) };
    return this.http.get<Voter>(this.rootUrl + '/election/' + id + '/voters', reqHeaders);
  }

  addVoters(id: string, voters: Voter[]) {
    let reqHeaders = { headers: new HttpHeaders(this.getheadersWithAuth()) };
    let body = JSON.stringify(voters);
    return this.http.post(this.rootUrl + '/election/' + id + '/voters', body, reqHeaders);
  }

  addVoter(id: string, voter: Voter) {
    let reqHeaders = { headers: new HttpHeaders(this.getheadersWithAuth()) };
    let body = JSON.stringify(voter);
    return this.http.post(this.rootUrl + '/election/' + id + '/voter', body, reqHeaders);
  }

  getBallots(id: string) {
    let reqHeaders = { headers: new HttpHeaders(this.getheadersWithAuth())};
    return this.http.get<Ballot>(this.rootUrl + '/election/' + id + '/ballots', reqHeaders);
  }

  vote(id: string, ballot: Ballot) {
    let reqHeaders = { headers: new HttpHeaders(this.getheadersNoAuth())};
    let body = JSON.stringify(ballot);
    return this.http.post(this.rootUrl + '/vote/' + id, body, reqHeaders);
  }

  getResults(id: string) {
    let reqHeaders = { headers: new HttpHeaders(this.getheadersWithAuth())};
    return this.http.get<Winner[]>(this.rootUrl + '/result/' + id , reqHeaders).pipe(map(data => {
      return data.map(value => new Winner().deserialize(value))
    }));
  }

  // Utility functions
   setElections(elections: Election[]) {
     this.currentElectionsSubject.next(elections);
     this.currentElectionsReplaySubject.next(elections);
   }

   removeElection(electionId: string) {
    let elections = this.currentElectionsSubject.value.
          filter((election) => !(election._id === electionId));
    this.setElections(elections);
   }

   purgeElections() {
     this.currentElectionsSubject.next({} as Election[]);
   }

   getCurrentElections() : Election[]{
     return this.currentElectionsSubject.value;
   }
}