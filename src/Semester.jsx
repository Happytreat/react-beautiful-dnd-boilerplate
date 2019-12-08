import React from 'react';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import Module from './Module';

const Container = styled.div`
  margin: 9px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`;

const Title = styled.h3`
  padding: 9px;
`;

const ModuleList = styled.div`
  padding:8px;
`;

export default class Semester extends React.Component {
  render() {
    const { semester, modules } = this.props;
    return (
      <Container>
        <Title>{ semester.title }</Title>
        <Droppable droppableId={semester.id}>
          {
            (provided) => (
              <ModuleList
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                { modules.map((mod, index) => <Module key={mod.id} module={mod} index={index} />) }
                {provided.placeholder}
              </ModuleList>
            )
          }
        </Droppable>
      </Container>
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
};
