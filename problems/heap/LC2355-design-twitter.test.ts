import { IndexedBinaryHeap } from '@/utils/Heap'

type Tweet = {
  id: number
  sequentialId: number
}

class User {
  public tweets: Tweet[] = []
  public followeeIds = new Set<number>() // other user ids that this user follows
}

class Twitter {
  private users = new Map<number, User>()
  private nextSequentialId = 1

  constructor() {}

  private ensureUser(userId: number): User {
    let user: User | undefined = this.users.get(userId)

    if (!user) {
      user = new User()
      this.users.set(userId, user)
    }

    user.followeeIds.add(userId)

    return user
  }

  postTweet(userId: number, tweetId: number): void {
    const user = this.ensureUser(userId)

    const tweet: Tweet = {
      id: tweetId,
      sequentialId: this.nextSequentialId,
    }

    this.nextSequentialId += 1

    user.tweets.push(tweet)
  }

  getNewsFeed(userId: number): number[] {
    const user = this.ensureUser(userId)

    type FeedPointer = {
      user: User
      tweetIndex: number
    }

    const heap = new IndexedBinaryHeap<FeedPointer>(
      (a, b) =>
        b.user.tweets[b.tweetIndex]!.sequentialId - a.user.tweets[a.tweetIndex]!.sequentialId
    ) // max heap

    Array.from(user.followeeIds).forEach((followeeId) => {
      const followee = this.ensureUser(followeeId)

      if (followee.tweets.length > 0) {
        heap.enqueue({
          user: followee,
          tweetIndex: followee.tweets.length - 1,
        })
      }
    })

    const feedTweetIds: number[] = []

    for (let i = 0; i < 10; i++) {
      if (heap.size === 0) {
        break
      }

      const pointer = heap.dequeue()

      feedTweetIds.push(pointer.user.tweets[pointer.tweetIndex]!.id)

      pointer.tweetIndex -= 1

      if (pointer.tweetIndex >= 0) {
        heap.enqueue(pointer)
      }
    }

    return feedTweetIds
  }

  follow(followerId: number, followeeId: number): void {
    const user = this.ensureUser(followerId)

    user.followeeIds.add(followeeId)
  }

  unfollow(followerId: number, followeeId: number): void {
    const user = this.ensureUser(followerId)

    user.followeeIds.delete(followeeId)
  }
}

describe('tests', () => {
  it('desc 0', () => {
    const twitter = new Twitter()
    twitter.postTweet(1, 5) // User 1 posts a new tweet (id = 5).

    let list = twitter.getNewsFeed(1) // User 1's news feed should return a list with 1 tweet id -> [5]. return [5]
    expect(list).toEqual([5])

    twitter.follow(1, 2) // User 1 follows user 2.
    twitter.postTweet(2, 6) // User 2 posts a new tweet (id = 6).

    list = twitter.getNewsFeed(1) // User 1's news feed should return a list with 2 tweet ids -> [6, 5]. Tweet id 6 should precede tweet id 5 because it is posted after tweet id 5.
    expect(list).toEqual([6, 5])

    twitter.unfollow(1, 2) // User 1 unfollows user 2.

    list = twitter.getNewsFeed(1) // User 1's news feed should return a list with 1 tweet id -> [5], since user 1 is no longer following user 2.
    expect(list).toEqual([5])
  })

  it('test 0', () => {
    const twitter = new Twitter()
    twitter.postTweet(1, 5)
    twitter.postTweet(1, 3)

    const list = twitter.getNewsFeed(1)
    expect(list).toEqual([3, 5])
  })
})
