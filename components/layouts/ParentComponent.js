import React, { useState } from 'react';
import Stories from './Stories';

const ParentComponent = () => {
  const [stories, setStories] = useState();

  const handleDelete = (itemId) => {
    const updatedStories = stories.filter((story) => story.item !== itemId);
    setStories(updatedStories);
  };

  return (
    <div>
      <h1>Stories List</h1>
      {/* Pass the state and onDelete function to the Stories component */}
      <Stories state={stories} onDelete={handleDelete} />
    </div>
  );
};

export default ParentComponent;