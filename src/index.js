import React from 'react';
import ReactDOM from 'react-dom';
import styled from "styled-components";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import Semester from './Semester';
import stubData from './stubData';

const Container = styled.div`
  display: flex;
`;


/**
 * To optimize performance without rendering all the modules/semesters when we just want to drag semester
 * - to change background color etc (update snapshot component)
 * */
class InnerSemList extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { semester, moduleList, index } = this.props;
    if (
      nextProps.semester === semester &&
      nextProps.moduleList === moduleList &&
      nextProps.index === index
    ) { return false; }
    return true;
  }

  render() {
    const { semester, moduleList, index } = this.props;
    const modules = semester.moduleIds.map(modId => moduleList[modId]);
    return <Semester
      key={semester.id}
      semester={semester}
      modules={modules}
      index={index}
    />;
  }
}

class App extends React.Component {
  state = stubData;

  onDragEnd = result => {
    // @type: to reorder both semesters and modules
    const {
      destination, source, draggableId, type
    } = result;

    // destination == null when drop outside of the list
    if (!destination) return;

    // @index: reordering within column
    // @droppableId: semester.id
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;

    if (type === 'semester') {
      const newSemesterOrder = Array.from(this.state.semesterOrder);
      newSemesterOrder.splice(source.index, 1);
      newSemesterOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...this.state,
        semesterOrder: newSemesterOrder
      };

      this.setState(newState);
    }

    if (type === 'module') {
      const start = this.state.semesters[source.droppableId];
      const finish = this.state.semesters[destination.droppableId];

      if (start === finish) {
        const newModuleIds = Array.from(start.moduleIds);
        newModuleIds.splice(source.index, 1);
        newModuleIds.splice(destination.index, 0, draggableId);

        const newSemester = {
          ...start,
          moduleIds: newModuleIds,
        };

        const newState = {
          ...this.state,
          semesters: {
            ...this.state.semesters,
            [newSemester.id]: newSemester
          }
        };

        this.setState(newState);
        return;
      }

      // Moving from one list to another
      const startModuleIds = Array.from(start.moduleIds);
      startModuleIds.splice(source.index, 1);
      const newStart = {
        ...start,
        moduleIds: startModuleIds,
      };

      const finishModuleIds = Array.from(finish.moduleIds);
      finishModuleIds.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...finish,
        moduleIds: finishModuleIds,
      };

      const newState = {
        ...this.state,
        semesters: {
          ...this.state.semesters,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish
        }
      };

      this.setState(newState);
    }
  };

  render() {
      return (
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable
            droppableId='all-semesters'
            direction='horizontal'
            type='semester'
          >
            {(provided) => (
              <Container
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {
                  this.state.semesterOrder.map((semId, index) => {
                    const sem = this.state.semesters[semId];
                    // Use full data struct of sem and mod lists
                    return <InnerSemList
                      key={semId}
                      semester={sem}
                      moduleList={this.state.modules}
                      index={index}
                    />;
                  })}
                {provided.placeholder}
              </Container>
            )}
          </Droppable>
        </DragDropContext>
      );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
