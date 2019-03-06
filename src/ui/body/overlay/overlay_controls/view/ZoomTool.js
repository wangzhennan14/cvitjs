import {h, Component} from 'preact';
import paper from 'paper';
import {calculateZoomAndPan, zoomCanvas} from '../../../../../canvas/Utilities';

export default class ZoomTool extends Component{
  onClick(event) {
    event.preventDefault();
    let oz = paper.project.getActiveLayer().zoom || 1;
    let nz = calculateZoomAndPan(oz, this.props.zoomDir,paper.view.center, paper.view.center);
    zoomCanvas(nz[0],oz);
    paper.view.draw();
  }

  render(props,state){
    return (
      <button
        className={'u-full-width cvit-button'}
        onClick={(e)=>this.onClick(e)}
      >
        <i className={'material-icons'}> {props.zoomDir === 1 ? 'zoom_in' : 'zoom_out' } </i>
      </button>
    );
  }
}
