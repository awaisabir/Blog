import React from 'react';
import { Header, Item, Icon, Button } from 'semantic-ui-react';

import matthew from '../../assets/matthew.png';

export default ({ post, getPost, history }) => (
  <Item>
    <Item.Image size='tiny' src={matthew} />

    <Item.Content className="post-item">
      <Header as="h2">{post.heading}</Header>
      <Item.Meta>by {post.username}</Item.Meta>
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <Button onClick={() => history.push(`/posts/${post._id}`)}>
          View <Icon name='chevron right' />
        </Button>
      </div>
      {/* <Item.Description>
        {post.content}
      </Item.Description> */}
      <Item.Extra>{post.likes} <Icon name='thumbs up' />  {post.dislikes} <Icon name='thumbs down' /></Item.Extra>
    </Item.Content>
  </Item>
);