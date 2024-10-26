import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { details } from '../ProfilePage/Profile';
import { useSelectedIndex } from "../../context"; 

const CommentBox = () => {
  const { selectedIndex } = useSelectedIndex(); 
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentContent, setEditCommentContent] = useState('');

  useEffect(() => {
    const fetchComments = async () => {

      try {
        const response = await axios.get(`http://localhost:4000/comments/${selectedIndex}`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [selectedIndex]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newComment = {
      id: selectedIndex,
      author: details.name,
      content: comment,
      date: new Date(),
    };

    try {
      const response = await axios.post('http://localhost:4000/comments', newComment);
      setComments((prevComments) => [...prevComments, response.data]);
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
      const updatedComment = { content: editCommentContent };
      const response = await axios.put(`http://localhost:4000/comments/${commentId}`, updatedComment);
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === commentId ? { ...comment, content: editCommentContent } : comment
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
      await axios.delete(`http://localhost:4000/comments/${commentId}`);
      setComments((prevComments) => prevComments.filter((comment) => comment._id !== commentId));
    } catch (error) {
      console.error('Error deleting the comment:', error);
    }
  };

  return (
    <div className='w-full bg-white p-4'>
      <div className='flex justify-between items-center mb-4'>
        <button className='text-gray-500 hover:text-gray-800'>
        </button>
      </div>
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
            comments.map((commentItem) => (
              <div key={commentItem._id} className='border-b mb-4 pb-2'>
                <p><strong>{commentItem.author}</strong> on {new Date(commentItem.date).toLocaleDateString()}</p>
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
