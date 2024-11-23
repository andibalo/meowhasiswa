import React, { useState } from 'react';
import { View } from 'tamagui';
import { Error, Loading, NotFound } from 'components/common';
import { ThreadList } from 'components/home';
import { useFetchThreadListQuery } from 'redux/api';

interface UserThreadTabProps {
  user_id: string; // ID of the user whose threads are being displayed
}

export const UserThreadTab: React.FC<UserThreadTabProps> = ({ user_id }) => {
  const [cursor, setCursor] = useState("");

  const { data, error, isLoading } = useFetchThreadListQuery({
    cursor,
    limit: 10,
    user_id,
  });

  const onRefresh = () => {
    setCursor(""); // Reset cursor to refresh the list
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
          currentUserId={user_id} // Pass the current user's ID
        />
      ) : (
        <NotFound description="No posts found for this user" />
      )}
    </View>
  );
};