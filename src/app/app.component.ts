import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from './services/authentication.service';
import { TripService } from './services/trip.service';
import { Viaggio } from './shared/viaggio';
import { LoginComponent } from './login/login.component';
import { User } from './shared/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'marebus';
  user: string = '';
  admin: boolean = false;
  user$: User | null = null;
  numeroViaggio: string;
  trips: Viaggio[]
  userSubscription: any;
  constructor(
    public auth: AuthenticationService,
    private tripService: TripService,
    public dialog: MatDialog,
  ) { }
  ngOnInit() {
    this.login()
    setTimeout(() => {
      this.userSubscription = this.auth.user$.subscribe((user) => {
        this.auth.canDelete(user) ? this.admin = true : this.admin = false;
        this.user$ = user;
        if (user != null) {
          this.user = user?.displayName
          this.tripService.actualViaggio.subscribe((trip) => this.numeroViaggio = trip.numeroViaggio)
          this.tripService.getTrips().subscribe((trips) => {
            this.trips = trips;
            this.trips.sort((a: Viaggio, b: Viaggio) => (a.numeroViaggio > b.numeroViaggio ? 1 : ((b.numeroViaggio > a.numeroViaggio) ? -1 : 0)))
            this.tripService.setNumber(parseInt(this.trips[this.trips.length - 1].numeroViaggio))
          })
        }
        else {
          this.user$ = null;
          this.user = '';
          this.admin = false;
        }
      })
    }, 1000)
  }
  ngAfterViewInit() {
  }
  login() {
    this.dialog.open(LoginComponent, { panelClass: "editDialog", width: '500px', height: '500px' });
  }
  logout() {
    this.auth.logout().then(()=>{
      setTimeout(()=>{
        this.user$ = null;
        this.user = '';
        this.admin = false;
      },1000)
    })
  }
}
