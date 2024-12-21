import React, { Component } from 'react';
import './AddItem.scss'; 

class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTask: '',
      newDescription: '',
      severity: 'low',
      errorMessage: '',
    };
  }

  onAddItem = (e) => {
    e.preventDefault();
    const { newTask, newDescription, severity } = this.state;

    if (!newTask.trim()) {
      this.setState({ errorMessage: 'Название задачи не может быть пустым.' });
      return;
    }

    this.props.handleAddItem(newTask, newDescription, severity);
    this.setState({ newTask: '', newDescription: '', severity: 'low', errorMessage: '' });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, errorMessage: '' });
  };

  render() {
    const { newTask, newDescription, severity, errorMessage } = this.state;

    return (
      <form className="new-task" onSubmit={this.onAddItem}>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <input
          name="newTask"
          className="new-task__input"
          placeholder="Введите название задачи"
          value={newTask}
          onChange={this.handleChange}
          type="text"
          required
        />
        <input
          name="newDescription"
          className="new-task__input"
          placeholder="Введите описание задачи (необязательно)"
          value={newDescription}
          onChange={this.handleChange}
          type="text"
        />
        <label>Выберите важность:</label>
        <select name="severity" value={severity} onChange={this.handleChange} className="new-task__select">
          <option value="low">Низкий</option>
          <option value="medium">Средний</option>
          <option value="high">Высокий</option>
        </select>
        <button type="submit" className="button">Добавить</button>
      </form>
    );
  }
}

export default AddItem;