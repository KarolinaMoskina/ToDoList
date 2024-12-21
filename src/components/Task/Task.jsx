import React from 'react';
import './Task.scss'; 

class Task extends React.Component {
  handleComplete = () => {
    const { task, onComplete } = this.props;
    onComplete(task);
  };

  render() {
    const { task, onDelete } = this.props;
    const severityColors = {
      low: 'lightgreen',
      medium: 'lightyellow',
      high: 'lightcoral',
    };

    return (
      <div className="task" style={{ backgroundColor: severityColors[task.severity] }}>
        <label className="task__label">
          <input
            type="checkbox"
            className="task__checkbox"
            checked={task.done}
            onChange={this.handleComplete}
          />
          <span className="task__text">{task.title}</span>
        </label>
        {task.description && <div className="task__description">{task.description}</div>}
        <div className="task__info">
          <span className="task__date">{task.createdAt}</span>
          <button className="task__delete-btn" onClick={() => onDelete(task.id)}>
            <img src={`${process.env.PUBLIC_URL}/trash-bin.svg`} alt="Удалить" className="delete-icon" />
          </button>
        </div>
      </div>
    );
  }
}

export default Task;