import React from 'react';
import { SimplyThree } from './SampleThree';
import './three.css';

class Three extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  componentDidMount () {
    this.three = new SimplyThree({ id: 'three' });
    console.log(this.three);
    SimplyThree.loadGLTF('/src/assets/3d/bluecar.glb')
      .then(res => {
        this.three.addMesh(res.scene, mesh => {
          mesh.scale.set(4, 4, 4);
          mesh.position.set(0, 0, 0)
        })
      })
      .catch(console.warn);
    // this.three.addMesh()
    this.three.render();
  }

  render() { 
    return (
      <div className='con'>
        <div className='three' id="three"></div>
      </div>
    );
  }

}
 
export default Three;
