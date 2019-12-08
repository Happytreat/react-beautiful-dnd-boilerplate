import React from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext } from 'react-beautiful-dnd';

import Semester from './Semester';
import stubData from './stubData';

class App extends React.Component {
  state = stubData;

  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    // destination == null when drop outside of the list
    if (!destination) return;

    // @index: reordering within column
    // @droppableId: semester.id
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;

    const semester = this.state.semesters[source.droppableId];
    const newModuleIds = Array.from(semester.moduleIds);
    newModuleIds.splice(source.index, 1);
    newModuleIds.splice(destination.index, 0, draggableId);

    const newSemester = {
      ...semester,
      moduleIds: newModuleIds,
    }

    const newState = {
      ...this.state,
      semesters: {
        ...this.state.semesters,
        [newSemester.id]: newSemester
      }
    }

    this.setState(newState);
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
