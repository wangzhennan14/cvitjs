import {h, Component} from 'preact';
import paper from 'paper';

import CvitCanvas from './canvas/Canvas';
import CvitModal from './modal';
import CvitControls from './overlay/Overlay';

export default class CvitHeader extends Component {
  capitalise(str){
    return str.replace(/\w\S*/g, (word) => {
      return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    });
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    if(paper.projects[0] && nextProps.cvitModel.active === 'canvas'){
      paper.projects[0].activate();
    }
  };

  render(props,state){
    let active = props.cvitModel.active;
    console.log('modal test',active,/color.*/.test(active));
    return (
      <div class='row cvit' id={'cvit-main'}>
        {active === 'canvas' || /color.*/.test(active) ?
          <CvitControls
            mouseTool = {props.cvitModel.mouseTool}
            selectTool = {(state) =>{props.cvitModel.setTool(state)}}
            changeModal = {(state) =>{
              if(state !== active) {
                props.cvitModel.setActive(state);
              } else {
                props.cvitModel.setActive('canvas');
              }
            }}
          /> :
          null
        }
        {active === 'canvas' ?
          <CvitCanvas
            cvitData={props.cvitModel.data}
            cvitConfig={props.cvitModel.config}
            cvitView={props.cvitModel.view}
            dirty={props.cvitModel.dirty}
            setDirty={(newState)=>props.cvitModel.setDirty(newState)}
          />
          :
          active === 'status' ?
            <div className={'twelve columns'} id={'loading-div'}> "Loading Cvit Canvas" </div>
            : <CvitModal
              active={active}
            />
        }
      </div>
    );
  }
}