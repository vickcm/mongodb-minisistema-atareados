import React, { useState, useEffect } from 'react';
import { Container } from "bootstrap-4-react/lib/components/layout";
import Image from "react-bootstrap/Image";
import ImagePerfil from "../../imagenes/perfil.jpg";
import "../../css/PerfilEstilos.css";
import profileService from "../../service/profile.service";
import { useNavigate, Link } from 'react-router-dom';
import { getAge } from '../../utils/utils'

function PerfilPage() {
  const navigate = useNavigate()
  const [profiles, setProfiles] = useState([])

  useEffect(()=>{
    profileService.getProfile()
        .then(profiles =>{
          console.log(profiles)
          setProfiles(profiles)
        })
        .catch(err => {
          console.log(err)
          navigate('/crearperfil', {replace: true})
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
            {profiles.username}, {getAge(profiles.nacimiento)} años. 
          </h2>
          <p  className='title'>
            {profiles.email}
          </p>
          <Link to="/perfil/editar"  className="btn-perfil-editar">
            Editar Perfil
          </Link>
        </div>
      </Container>
    </>
  );
}

export default PerfilPage;