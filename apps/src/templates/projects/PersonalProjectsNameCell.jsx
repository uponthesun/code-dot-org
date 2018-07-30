import React, {Component, PropTypes} from 'react';
import {tableLayoutStyles} from "../tables/tableConstants";
import i18n from "@cdo/locale";

const styles = {
  inputBox: {
    width: 225,
  },
};

export default class PersonalProjectsNameCell extends Component {
  static propTypes = {
    projectId: PropTypes.string.isRequired,
    projectType: PropTypes.string.isRequired,
    projectName: PropTypes.string.isRequired,
    isEditing: PropTypes.bool,
    updatedName: PropTypes.string,
    editProject: PropTypes.func.isRequired,
  };

  onChangeName = (e) => {
    this.props.editProject(this.props.projectId, {name: e.target.value});
  };

  render() {
    const {projectId, projectType, projectName, updatedName, isEditing} = this.props;
    const url = `/projects/${projectType}/${projectId}/`;

    return (
      <div>
        {!isEditing &&
          <a style={tableLayoutStyles.link} href={url} target="_blank">{projectName}</a>
        }
        {isEditing &&
          <div>
            <input
              required
              style={styles.inputBox}
              value={updatedName}
              onChange={this.onChangeName}
              placeholder={i18n.nameRequired()}
            />
          </div>
        }
      </div>
    );
  }
}
