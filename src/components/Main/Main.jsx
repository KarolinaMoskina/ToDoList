import React, { Component } from 'react';
import AddItem from '../AddItem/AddItem';
import Task from '../Task/Task';
import Filters from '../Filters/Filters';
import './Main.scss'; 

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listItems: [],
      showCompleted: false,
      searchQuery: '',
      selectedSeverities: [],
      nextId: 1,
    };
  }

  generateRandomTasks = (count) => {
    const tasks = [];
    for (let i = 0; i < count; i++) {
      const task = {
        id: this.state.nextId++,
        title: `Task ${Math.random().toString(36).substring(2, 7)}`,
        description: `This is a random description consisting of ${Math.floor(Math.random() * 10) + 1} words.`,
        done: Math.random() < 0.5,
        severity: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
        createdAt: new Date().toLocaleString(),
      };
      tasks.push(task);
    }
    this.setState(prevState => ({
      listItems: [...prevState.listItems, ...tasks],
    }));
  };

  handleAddItem = (taskText, taskDescription, severity) => {
    const task = {
      id: this.state.nextId++,
      title: taskText,
      description: taskDescription,
      done: false,
      severity,
      createdAt: new Date().toLocaleString(),
    };

    this.setState(prevState => ({
      listItems: [...prevState.listItems, task],
    }));
  };

  handleDeleteItem = (id) => {
    this.setState(prevState => ({
      listItems: prevState.listItems.filter((el) => el.id !== id),
    }));
  };

  handleCompleteStatusUpdate = (item) => {
    this.setState(prevState => ({
      listItems: prevState.listItems.map((el) => {
        if (el.id === item.id) {
          return { ...el, done: !el.done };
        }
        return el;
      }),
    }));
  };

  handleToggleShowCompleted = () => {
    this.setState(prevState => ({
      showCompleted: !prevState.showCompleted,
    }));
  };

  handleSearchChange = (query) => {
    this.setState({ searchQuery: query });
  };

  handleSeverityChange = (selectedSeverities) => {
    this.setState({ selectedSeverities });
  };

  render() {
    const { listItems, showCompleted, searchQuery, selectedSeverities } = this.state;

    const filteredItems = listItems
      .filter(item => showCompleted || !item.done)
      .filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter(item => 
        selectedSeverities.length === 0 || selectedSeverities.includes(item.severity)
      );

    const displayNoResults = searchQuery && filteredItems.length === 0;

    return (
      <div className="main">
        <AddItem handleAddItem={this.handleAddItem} />
        <button onClick={() => this.generateRandomTasks(1000)} className="generateBtn">Сгенерировать 1000 задач</button>
        <Filters 
          showCompleted={showCompleted} 
          onToggleShowCompleted={this.handleToggleShowCompleted}
          onSearchChange={this.handleSearchChange}
          onSeverityChange={this.handleSeverityChange}
          tasks={listItems}
          selectedSeverities={this.state.selectedSeverities}
        />
        <ul className="list-tasks">
          {displayNoResults && <li>По вашим критериям ничего не найдено.</li>}
          {filteredItems.map((el) => (
            <Task
              key={el.id}
              task={el}
              onDelete={this.handleDeleteItem}
              onComplete={this.handleCompleteStatusUpdate}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default Main;