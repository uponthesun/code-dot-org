import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import QuickActionsCell from "../tables/QuickActionsCell";
import PopUpMenu, {MenuBreak} from "@cdo/apps/lib/ui/PopUpMenu";
import color from "../../util/color";
import Button from '../Button';
import FontAwesome from '../FontAwesome';
import i18n from '@cdo/locale';
import {showPublishDialog} from './publishDialog/publishDialogRedux';
import {
  startRenamingProject,
  saveProjectName,
  cancelRenamingProject,
  unpublishProject,
} from './projectsRedux';

export const styles = {
  xIcon: {
    paddingRight: 5,
  },
};

class PersonalProjectsTableActionsCell extends Component {
  static propTypes = {
    isPublished: PropTypes.bool.isRequired,
    projectId: PropTypes.string.isRequired,
    projectType: PropTypes.string.isRequired,
    showPublishDialog: PropTypes.func.isRequired,
    isRenaming: PropTypes.bool,
    startRenamingProject: PropTypes.func,
    saveProjectName: PropTypes.func,
    cancelRenamingProject: PropTypes.func,
    isSaving: PropTypes.bool,
    disableSaving: PropTypes.bool,
    unpublishProject: PropTypes.func.isRequired,
  };

  state = {
    deleting: false,
    publishing: false,
    unpublishing: false,
    renaming: false,
    remixing: false
  };

  onPublish = () => {
    this.props.showPublishDialog(this.props.projectId, this.props.projectType);
  };

  onRename = () => {
    this.props.startRenamingProject(this.props.projectId);
  };

  onSave = () => {
    this.props.saveProjectName(this.props.projectId);
  };

  onCancel = () => {
    this.props.cancelRenamingProject(this.props.projectId);
  };

  onUnpublish = () => {
    this.props.unpublishProject(this.props.projectId);
  };

  render() {
    const {isRenaming} = this.props;

    return (
      <div>
        {!isRenaming  &&
          <QuickActionsCell>
            <PopUpMenu.Item
              onClick={this.onRename}
            >
              {i18n.rename()}
            </PopUpMenu.Item>
            <PopUpMenu.Item
              onClick={() => console.log("Remix was clicked")}
            >
              {i18n.remix()}
            </PopUpMenu.Item>
            {this.props.isPublished && (
              <PopUpMenu.Item
                onClick={this.onUnpublish}
              >
                {i18n.unpublish()}
              </PopUpMenu.Item>
            )}
            {!this.props.isPublished && (
              <PopUpMenu.Item
                onClick={this.onPublish}
              >
                {i18n.publish()}
              </PopUpMenu.Item>
            )}
            <MenuBreak/>
            <PopUpMenu.Item
              onClick={() => console.log("Delete was clicked")}
              color={color.red}
            >
              <FontAwesome icon="times-circle" style={styles.xIcon}/>
              {i18n.delete()}
            </PopUpMenu.Item>
          </QuickActionsCell>
        }
        {isRenaming &&
          <div>
            <Button
              onClick={this.onSave}
              color={Button.ButtonColor.orange}
              text={i18n.save()}
              disabled={this.props.isSaving || this.props.disableSaving}
              style={styles.saveButton}
            />
            <Button
              onClick={this.onCancel}
              color={Button.ButtonColor.gray}
              text={i18n.cancel()}
            />
          </div>
        }
      </div>
    );
  }
}

export default connect(state => ({}), dispatch => ({
  showPublishDialog(projectId, projectType) {
    dispatch(showPublishDialog(projectId, projectType));
  },
  unpublishProject(projectId) {
    dispatch(unpublishProject(projectId));
  },
  startRenamingProject(projectId) {
    dispatch(startRenamingProject(projectId));
  },
  saveProjectName(projectId, updatedName) {
    dispatch(saveProjectName(projectId, updatedName));
  },
  cancelRenamingProject(projectId) {
    dispatch(cancelRenamingProject(projectId));
  },
}))(PersonalProjectsTableActionsCell);
