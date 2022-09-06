import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SelectComponent } from './components/select/select.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DecimalPipePipe } from '../decimal-pipe.pipe';

@NgModule({
  declarations: [HeaderComponent, SpinnerComponent, SelectComponent, HomeComponent, PageNotFoundComponent, DecimalPipePipe],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
  ],
  exports: [HeaderComponent, SpinnerComponent, FormsModule, SelectComponent, HomeComponent, DecimalPipePipe],
})
export class SharedModule {}
