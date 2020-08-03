import io from 'socket.io-client';

function About() {
  const socket = io();
  socket.on('likeOnPost', (e) => {
    console.log(e);
  });
  socket.on('commentOnPost', (e) => {
    console.log(e);
  });

  return <h1>About</h1>;
}

// About.getInitialProps = async ({ query }) => {
//   const { posts } = query;
//   return { posts };
// };

export default About;
