import Comment from "../components/Comment";

function createComment({ author, date, text }) {
  const comment = new Comment({
    author,
    date,
    text,
    handleLike: () => {
      comment.like();
    },
    handleDelete: () => {
      comment.delete();
    },
  }, '#comment');

  return comment.createComment();
}

function addComment(comment, container) {
  container.append(comment);
}

function handleDate(date) {
  let today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);

  let dateOfComment = new Date(date);
  dateOfComment.setHours(0, 0, 0, 0);

  switch (true) {
    case date === '':
    case dateOfComment.getFullYear() <= 2010:
    case today <= dateOfComment:
      return 'Сегодня';

    case yesterday.getTime() === dateOfComment.getTime():
      return 'Вчера';
  }
  return date;
}

export { createComment, addComment, handleDate };