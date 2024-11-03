import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../AuthContext'

const CommentBox = () => {
  const { id } = useParams();

  const { user } = useContext(AuthContext)
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentContent, setEditCommentContent] = useState('');

  function convertStringToASCIIInt(input) {
    let asciiString = '';

    for (let char of input) {
        asciiString += char.charCodeAt(0); 
    }

    return asciiString; 
}

  useEffect(() => {
    const fetchComments = async () => {
      const newId = convertStringToASCIIInt(id);
      console.log(newId);
      try {
        const response = await fetch(`http://localhost:3000/comments/comments/${newId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setComments(data);

      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();

  }, [id]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const newId = convertStringToASCIIInt(id);

    console.log(newId);

    const newComment = {
      id: newId,
      author: user.username,

      content: comment,
      date: new Date(),
    };

    try {

      const response = await fetch('http://localhost:3000/comments/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComment),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const savedComment = await response.json();
      setComments((prevComments) => [...prevComments, savedComment]);

    } catch (error) {
      console.error('Error submitting the comment:', error);
    }

    setComment('');
  };

  const handleEdit = (commentId, currentContent) => {
    setEditCommentId(commentId);
    setEditCommentContent(currentContent);
  };

  const handleUpdateComment = async (commentId) => {
    try {
      const updatedComment = { 
        content: editCommentContent,
        author: user
      };
  
      const response = await fetch(`http://localhost:3000/comments/comments/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedComment),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const updatedData = await response.json();
  
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === commentId ? { ...comment, content: updatedData.content } : comment
        )
      );
  
      setEditCommentId(null);
      setEditCommentContent('');
    } catch (error) {
      console.error('Error updating the comment:', error);
    }
  };
  

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(`http://localhost:3000/comments/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ author: user }), 
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      setComments((prevComments) => prevComments.filter((comment) => comment._id !== commentId));
    } catch (error) {
      console.error('Error deleting the comment:', error);
    }
  };
  

  return (
    <div className='w-full bg-white p-4'>

      <form className='flex justify-between w-full items-baseline mb-4' onSubmit={handleSubmit}>
        <input
          type='text'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder='Type your comment here...'
          className='w-full p-3 border border-gray-500 rounded-3xl focus:outline-none'
        />
        <button 
          type='submit' 
          className='bg-black text-white rounded-3xl px-4 h-12 w-1/6 py-2 hover:bg-slate-700'>
          Submit
        </button>
      </form>
      <div className='overflow-y-auto h-[25rem]'>
        <div className='w-full p-4'>
          {comments.length > 0 ? (

comments.map((commentItem, index) => (
  <div key={index} className='border-b mb-4 pb-2'>
    <p>
      <strong>{commentItem.author}</strong> on {new Date(commentItem.date).toLocaleDateString()}
    </p>
    {editCommentId === commentItem._id ? (
      <div>
        <input
          type='text'
          value={editCommentContent}
          onChange={(e) => setEditCommentContent(e.target.value)}
          className='border border-gray-500 rounded-lg p-2 w-full mb-3'
        />
        <button 
          onClick={() => handleUpdateComment(commentItem._id)}
          className='bg-blue-500 text-white px-2 py-1 rounded-lg ml-2'
        >
          Update
        </button>
        <button 
          onClick={() => setEditCommentId(null)} 
          className='bg-gray-500 text-white px-2 py-1 rounded-lg ml-2'
        >
          Cancel
        </button>
      </div>
    ) : (
      <div className='flex justify-between'>
        <p>{commentItem.content}</p>
        <div>
          {user.username === commentItem.author && ( // Check if user is the author
            <>
              <button 
                onClick={() => handleEdit(commentItem._id, commentItem.content)} 
                className='text-blue-500 ml-2'
              >
                Edit
              </button>
              <button 
                onClick={() => handleDeleteComment(commentItem._id)} 
                className='text-red-500 ml-2'
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    )}
  </div>
))

          ) : (
            <p>No comments yet for this blog post.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentBox;