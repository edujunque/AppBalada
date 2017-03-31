import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import CenaLogin from './components/CenaLogin';
import CenaTimeLine from './components/CenaTimeLine';
import CenaEventoDetalhes from './components/CenaEventoDetalhes';
import CenaEventoGaleria from './components/CenaEventoGaleria';
import Galeria from './components/Galeria';
import CenaLoginFacebook from './components/CenaLoginFacebook';
import CenaEditarPerfil from './components/CenaEditarPerfil';
import CenaEntrarJa from './components/CenaEntrarJa';

const Rotas = () => (
	<Router>
	    <Scene hideNavBar={true} key='login' component={CenaLogin} title='Login' initial={true} />
	    <Scene hideNavBar={true} navigationBarStyle={{paddingTop:50}} key='timeline' component={CenaTimeLine} title='TimeLine' />
	    <Scene hideNavBar={false} key='eventodetalhes' component={CenaEventoDetalhes} title='EventoDetalhes'/>
	    <Scene hideNavBar={false} key='eventogaleriafotos' component={CenaEventoGaleria} title='EventoGaleria'/>
	    <Scene hideNavBar={false} key='galeria' component={Galeria} title='Galeria' />
	    <Scene hideNavBar={false} key='CenaLoginFacebook' component={CenaLoginFacebook} title='CenaLoginFacebook' />
	    <Scene hideNavBar={false} key='editarPerfil' component={CenaEditarPerfil} title='CenaEditarPerfil' />
	    <Scene hideNavBar={false} key='entrarJa' component={CenaEntrarJa} title='CenaEntrarJa' />
	</Router>
	);

export default Rotas;
