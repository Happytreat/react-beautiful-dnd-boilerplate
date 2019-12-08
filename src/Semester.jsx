import React from 'react';
import PropTypes from 'prop-types';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import Module from './Module';

const Container = styled.div`
  margin: 9px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  background-color: white;
  width: 220px;
`;

const Title = styled.h4`
  padding: 9px;
`;

const ModuleList = styled.div`
  padding:8px;
  background-color: ${(props) => (props.isDraggingOver ? 'skyblue' : 'inherit')};
`;

export default class Semester extends React.Component {
  render() {
    const { semester, modules, index: semIndex } = this.props;
    return (
      <Draggable draggableId={semester.id} index={semIndex}>
        {(providedDragged) => (
          <Container
            {...providedDragged.draggableProps}
            ref={providedDragged.innerRef}
          >
            <Title {...providedDragged.dragHandleProps}>
              { semester.title }
            </Title>
            <Droppable droppableId={semester.id} type="module">
              {
                (provided, snapshot) => (
                  <ModuleList
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    isDraggingOver={snapshot.isDraggingOver}
                  >
                    { modules.map(
                      (mod, index) => <Module key={mod.id} module={mod} index={index} />
                    )}
                    {provided.placeholder}
                  </ModuleList>
                )
              }
            </Droppable>
          </Container>
        )}
      </Draggable>
    );
  }
}

Semester.propTypes = {
  semester: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  modules: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  })).isRequired,
  index: PropTypes.number.isRequired,
};
