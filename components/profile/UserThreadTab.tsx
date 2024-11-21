import React, { useState } from 'react';
import { View } from 'tamagui';
import { Error, Loading, NotFound } from 'components/common';
import { ThreadList } from 'components/home';
import { useFetchThreadListQuery } from 'redux/api';

interface UserThreadTabProps {
  user_id: string;
}

export const UserThreadTab: React.FC<UserThreadTabProps> = ({ user_id }) => {
  const [cursor, setCursor] = useState("");

  const { data, error, isLoading } = useFetchThreadListQuery({
    cursor,
    limit: 10,
    user_id,
  });

  const onRefresh = () => {
    setCursor("");
  };

  const handleLoadMore = () => {
    if (data?.data) {
      const nextCursor = data.data.meta.next_cursor;
      if (nextCursor) {
        setCursor(nextCursor);
      }
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  const threads = data?.data?.threads;

  return (
    <View flex={1}>
      {Array.isArray(threads) && threads.length > 0 ? (
        <ThreadList
          title="User's Posts"
          isLoading={isLoading}
          handleLoadMore={handleLoadMore}
          data={threads}
          onRefresh={onRefresh}
        />
      ) : (
        <NotFound description="No posts found for this user" />
      )}
    </View>
  );
};