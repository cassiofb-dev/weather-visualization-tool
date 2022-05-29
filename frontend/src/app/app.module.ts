import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './routes/home/home.component';
import { DocsComponent } from './routes/docs/docs.component';
import { AboutComponent } from './routes/about/about.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DocsComponent,
    AboutComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LeafletModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
