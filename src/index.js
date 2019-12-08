import React from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext } from 'react-beautiful-dnd';

import Semester from './Semester';
import stubData from './stubData';

class App extends React.Component {
  state = stubData;

  onDragEnd = result => {

  };

  render() {
      return (
        <DragDropContext onDragEnd={this.onDragEnd}>
          {
            this.state.semesterOrder.map((semId) => {
              const sem = this.state.semesters[semId];
              const modules = sem.moduleIds.map(modId => this.state.modules[modId]);

              // Use full data struct of sem and mod lists
              return <Semester key={semId} semester={sem} modules={modules} />;
          })}
        </DragDropContext>
      );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
