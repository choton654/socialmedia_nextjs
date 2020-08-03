import io from 'socket.io-client';

function About({ posts }) {
  const socket = io();
  socket.on('dbChange', (e) => {
    console.log(e);
  });

  return <pre>{JSON.stringify(posts)}</pre>;
}

About.getInitialProps = async ({ query }) => {
  const { posts } = query;
  return { posts };
};

export default About;
