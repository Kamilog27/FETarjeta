import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaService } from 'src/app/services/tarjeta.service';


@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {
  listTarjetas:any[]=[];
  form:FormGroup;
  accion='agregar';
  id:number|undefined;
  constructor(private fb:FormBuilder,private toastr: ToastrService,
    private tarjetaService:TarjetaService){
    this.form=this.fb.group({
      titular:['',Validators.required],
      numeroTarjeta:['',[Validators.required,Validators.maxLength(16),Validators.minLength(16)]],
      fechaExpiracion:['',[Validators.required,Validators.maxLength(5),Validators.minLength(5)]],
      cvv:['',[Validators.required,Validators.maxLength(3),Validators.minLength(3)]]
    })
  }

  guardarTarjeta(){
    
    const tarjeta:any={
      titular:this.form.get('titular')?.value,
      numeroTarjeta:this.form.get('numeroTarjeta')?.value,
      fechaExpiracion:this.form.get('fechaExpiracion')?.value,
      cvv:this.form.get('cvv')?.value
    }
    if(this.id==undefined){
      //Crear Tarjeta
      this.tarjetaService.postTarjeta(tarjeta).subscribe(data=>{
        this.toastr.success('La tarjeta fue registrada con éxito', 'Tarjeta Registrada');
        this.form.reset();
        this.obtenerTarjetas();
      },error=>{
        console.log(error);
        this.toastr.success('Oppss Ocurrio un error', 'Error');
      })
    }else{
      //Editamos Tarjeta
      tarjeta.id=this.id
      this.tarjetaService.putTarjeta(this.id,tarjeta).subscribe(data=>{
        this.form.reset();
        this.accion='agregar';
        this.id=undefined;
        this.toastr.info('La tarjeta fue actualizada con éxito!','Tarjeta Actualizado');
        this.obtenerTarjetas();
      },error=>{
        console.log(error);
      })
    }
   
  }
  eliminarTarjeta(i:number){
    this.tarjetaService.deleteTarjeta(i).subscribe(data=>{

      this.toastr.error('La tarjeta fue eliminada con éxito','Tarjeta eliminada');
      this.obtenerTarjetas();
    },error=>{
      console.log(error);
    })
  }
  ngOnInit(): void {
    this.obtenerTarjetas();
  }
  obtenerTarjetas(){
    this.tarjetaService.getListTarjetas().subscribe(data=>{
      this.listTarjetas=data;
    },error=>{
      console.log(error)
    })
  }
  editarTarjeta(tarjeta:any){
    this.accion='editar';
    this.id=tarjeta.id;
    this.form.patchValue({
      titular:tarjeta.titular,
      numeroTarjeta:tarjeta.numeroTarjeta,
      fechaExpiracion:tarjeta.fechaExpiracion,
      cvv:tarjeta.cvv
    })
  }
}
