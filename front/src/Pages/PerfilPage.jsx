/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import { Container } from "bootstrap-4-react/lib/components/layout";
import Image from "react-bootstrap/Image";
import ImagePerfil from "../imagenes/perfil.jpg";
import "../css/PerfilEstilos.css";
import profileService from "../service/profile.service";

function PerfilPage() {
  const [profiles, setProfiles] = useState([])

  useEffect(()=>{
    profileService.getProfile()
        .then(profiles =>{
          setProfiles(profiles)
        })
  },[])

  return (
    <>
      <Container className="container-perfil">
        <div className="img-perfil">
          <Image src={ImagePerfil} width="30%"  className='img-perfil'/>
        </div>
        <div className=""> 
          <h2 className='title'>
            Tu perfil es:  {profiles.username} 
          </h2>
          <h2  className='title'>
            Tu edad es:  {profiles.age}
          </h2>
        </div>
      </Container>
    </>
  );
}

export default PerfilPage;