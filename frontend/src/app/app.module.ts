import { NgModule }  from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeService } from './routes/home/home.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './routes/home/home.component';
import { DocsComponent } from './routes/docs/docs.component';
import { AboutComponent } from './routes/about/about.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DocsComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LeafletModule,
    HttpClientModule
  ],
  providers:[
    HomeService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
