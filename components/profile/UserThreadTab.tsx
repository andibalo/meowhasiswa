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

  const { data, error, isLoading, isFetching } = useFetchThreadListQuery({
    cursor,
    limit: 10,
    user_id,
  }, {
    refetchOnMountOrArgChange: true
  });

  const onRefresh = () => {
    if (isLoading || isFetching) {
      return
    }

    setCursor("");
  };

  const handleLoadMore = () => {
    if (isLoading || isFetching) {
      return
    }

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
          isLoadingMore={isLoading}
          handleLoadMore={handleLoadMore}
          data={threads}
          onRefresh={onRefresh}
          currentUserId={user_id}
          enableEditItem={true}
        />
      ) : (
        <NotFound description="No posts found for this user" />
      )}
    </View>
  );
};