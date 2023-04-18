import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AvatarService } from 'src/app/services/avatar.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {


  profile: any = {}; // initialize to empty object


  ngOnInit() {
  }


  public segment: string = "list";
  public arr = new Array(25);

  constructor(
    private avatarService: AvatarService,
    private authService: AuthService,
    private imageService: ImageService,
    private router: Router,

  ) {
    this.avatarService.getUserProfile().subscribe((data) => {
      this.profile = data;
    });
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
    
  }


  async changeImage() {
    try {
      await this.imageService.changeAvatar();
    } catch (error) {
      if (error.message === 'User cancelled photos app') {
        console.log('User cancelled selecting a photo.');
      } else {
        console.error(error);
      }
    }
  }

  
  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }
}
