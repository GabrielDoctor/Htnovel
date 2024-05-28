import React, { useState, useEffect } from "react";
import { useAuth } from "./contexts/AuthContext";
import { useSettings } from "./contexts/SettingContext";

interface Comment {
  id: string;
  user_id: string;
  novel_id: string;
  chapter_id?: string;
  parent_id?: string;
  content: string;
  published_at: string;
  user_name?: string;
  children?: Comment[];
}

interface ReplyState {
  isActive: boolean;
  parentId: string | null;
}

const CommentSection = ({ novelId }: { novelId: string }) => {
  const { userData } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [reply, setReply] = useState<ReplyState>({
    isActive: false,
    parentId: null,
  });
  const { systemTheme, theme } = useSettings();

  function buildCommentTree(
    comments: Comment[],
    parentId: string | null
  ): Comment[] {
    return comments
      .filter((comment) => comment.parent_id === parentId)
      .map((comment) => ({
        ...comment,
        children: buildCommentTree(comments, comment.id),
      }));
  }

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comment/${novelId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: Comment[] = await response.json();
      const commentTree = buildCommentTree(data, null);
      setComments(commentTree);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const postComment = async (commentData: string, parentId: string | null) => {
    try {
      if (userData?.role === "Guest") {
        alert("Please login to comment");
        return;
      }

      const response = await fetch("/api/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userData?.id,
          novel_id: novelId,
          parent_comment_id: parentId,
          comment_data: commentData,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      await fetchComments();
      setNewComment("");
      setReply({ isActive: false, parentId: null });
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const renderComments = (comments: Comment[], depth: number = 0) => {
    return comments.map((comment) => (
      <div
        key={comment.id}
        className={` p-4 border border-gray-900 dark:border-gray-200 rounded-lg ${
          depth > 0 ? "ml-" + depth * 4 : ""
        } `}
      >
        <p className="font-bold text-black dark:text-white">
          {comment.user_name}:
        </p>
        <p className=" font-semibold text-black dark:text-white">
          {comment.content}
        </p>
        <button
          className="mt-2 text-blue-500 hover:text-blue-600 transition-colors"
          onClick={() => setReply({ isActive: true, parentId: comment.id })}
        >
          Reply
        </button>
        {reply.isActive && reply.parentId === comment.id && (
          <div className="reply-section mb-4">
            <textarea
              className="w-full p-2 border dark:border-gray-300 border-gray-800 rounded-lg focus:ring focus:ring-blue-200"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a reply..."
            />
            <div className="flex justify-end space-x-2 mt-2">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                onClick={() => {
                  postComment(newComment, reply.parentId);
                  setReply({ isActive: false, parentId: null });
                }}
              >
                Post Reply
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
                onClick={() => setReply({ isActive: false, parentId: null })}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        {comment.children && comment.children.length > 0 && (
          <div className="replies mt-4 pl-4 border-l-2 border-gray-200">
            {renderComments(comment.children, depth + 1)}
          </div>
        )}
      </div>
    ));
  };

  useEffect(() => {
    fetchComments();
  }, [novelId]);

  return (
    <div className="comment-section p-4 shadow rounded-lg">
      <h3 className="text-2xl font-semibold mb-4">Comments</h3>
      {!reply.isActive && (
        <div className="comment-form mb-4">
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
          />
          <button
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            onClick={() => postComment(newComment, null)}
          >
            Comment
          </button>
        </div>
      )}
      <div className="comment-list space-y-4">{renderComments(comments)}</div>
    </div>
  );
};

export default CommentSection;
