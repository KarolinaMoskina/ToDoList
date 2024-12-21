import React from 'react';
import './Filters.scss'; 

class Filters extends React.Component {
  handleSearchChange = (e) => {
    this.props.onSearchChange(e.target.value);
  };

  handleSeverityChange = (e) => {
    const { value, checked } = e.target;
    const { selectedSeverities } = this.props;

    const newSeverities = checked
      ? [...selectedSeverities, value]
      : selectedSeverities.filter(severity => severity !== value);
      
    this.props.onSeverityChange(newSeverities);
  };

  render() {
    const { showCompleted, onToggleShowCompleted, tasks } = this.props;
    const severityOptions = [...new Set(tasks.map(task => task.severity))];

    return (
      <div className="filters">
        <label>
          <input
            type="checkbox"
            checked={showCompleted}
            onChange={onToggleShowCompleted}
          />
          {showCompleted ? 'Скрыть выполненные' : 'Показать выполненные'}
        </label>
        <input
          type="text"
          placeholder="Поиск..."
          onChange={this.handleSearchChange}
        />
        <div className="severity-filter">
          {severityOptions.map(severity => (
            <label key={severity}>
              <input
                type="checkbox"
                value={severity}
                onChange={this.handleSeverityChange}
              />
              {severity.charAt(0).toUpperCase() + severity.slice(1)}
            </label>
          ))}
        </div>
      </div>
    );
  }
}

export default Filters;