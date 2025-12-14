import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

type Section = 'streams' | 'chats' | 'friends' | 'profile';

interface Stream {
  id: number;
  streamer: string;
  game: string;
  viewers: number;
  thumbnail: string;
  avatar: string;
  live: boolean;
}

interface Friend {
  id: number;
  name: string;
  status: 'online' | 'offline' | 'playing';
  game?: string;
  avatar: string;
}

interface Message {
  id: number;
  user: string;
  message: string;
  time: string;
  avatar: string;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState<Section>('streams');
  const [selectedChat, setSelectedChat] = useState<number | null>(1);

  const streams: Stream[] = [
    {
      id: 1,
      streamer: 'ProGamer_X',
      game: 'Counter-Strike 2',
      viewers: 1234,
      thumbnail: '/placeholder.svg',
      avatar: '/placeholder.svg',
      live: true,
    },
    {
      id: 2,
      streamer: 'StreamKing',
      game: 'Dota 2',
      viewers: 856,
      thumbnail: '/placeholder.svg',
      avatar: '/placeholder.svg',
      live: true,
    },
    {
      id: 3,
      streamer: 'GamerGirl',
      game: 'Valorant',
      viewers: 2103,
      thumbnail: '/placeholder.svg',
      avatar: '/placeholder.svg',
      live: true,
    },
    {
      id: 4,
      streamer: 'NinjaMaster',
      game: 'League of Legends',
      viewers: 543,
      thumbnail: '/placeholder.svg',
      avatar: '/placeholder.svg',
      live: true,
    },
  ];

  const friends: Friend[] = [
    { id: 1, name: 'Alex', status: 'online', avatar: '/placeholder.svg' },
    { id: 2, name: 'Maria', status: 'playing', game: 'CS2', avatar: '/placeholder.svg' },
    { id: 3, name: 'Dmitry', status: 'online', avatar: '/placeholder.svg' },
    { id: 4, name: 'Kate', status: 'offline', avatar: '/placeholder.svg' },
    { id: 5, name: 'Sergey', status: 'playing', game: 'Dota 2', avatar: '/placeholder.svg' },
  ];

  const chats = [
    { id: 1, name: 'Команда CS', lastMessage: 'Го в игру?', unread: 3, avatar: '/placeholder.svg' },
    { id: 2, name: 'Alex', lastMessage: 'Смотрю стрим', unread: 0, avatar: '/placeholder.svg' },
    { id: 3, name: 'Raid Party', lastMessage: 'Все готовы?', unread: 7, avatar: '/placeholder.svg' },
  ];

  const messages: Message[] = [
    { id: 1, user: 'Alex', message: 'Привет! Го катку?', time: '14:32', avatar: '/placeholder.svg' },
    { id: 2, user: 'Вы', message: 'Давай, через 5 минут', time: '14:33', avatar: '/placeholder.svg' },
    { id: 3, user: 'Alex', message: 'Окей, жду в лобби', time: '14:34', avatar: '/placeholder.svg' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <aside className="w-20 bg-sidebar border-r border-sidebar-border flex flex-col items-center py-6 space-y-6">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center glow">
          <Icon name="Gamepad2" size={28} className="text-primary-foreground" />
        </div>

        <nav className="flex-1 flex flex-col space-y-4">
          <Button
            variant={activeSection === 'streams' ? 'default' : 'ghost'}
            size="icon"
            className="w-12 h-12 rounded-xl"
            onClick={() => setActiveSection('streams')}
          >
            <Icon name="Radio" size={24} />
          </Button>

          <Button
            variant={activeSection === 'chats' ? 'default' : 'ghost'}
            size="icon"
            className="w-12 h-12 rounded-xl"
            onClick={() => setActiveSection('chats')}
          >
            <Icon name="MessageSquare" size={24} />
          </Button>

          <Button
            variant={activeSection === 'friends' ? 'default' : 'ghost'}
            size="icon"
            className="w-12 h-12 rounded-xl"
            onClick={() => setActiveSection('friends')}
          >
            <Icon name="Users" size={24} />
          </Button>

          <Button
            variant={activeSection === 'profile' ? 'default' : 'ghost'}
            size="icon"
            className="w-12 h-12 rounded-xl"
            onClick={() => setActiveSection('profile')}
          >
            <Icon name="User" size={24} />
          </Button>
        </nav>

        <Button variant="ghost" size="icon" className="w-12 h-12 rounded-xl">
          <Icon name="Settings" size={24} />
        </Button>
      </aside>

      <main className="flex-1 flex">
        {activeSection === 'streams' && (
          <div className="flex-1 p-6">
            <div className="mb-6">
              <h1 className="text-4xl font-bold mb-2">Прямые трансляции</h1>
              <p className="text-muted-foreground">Смотри игры своих друзей в реальном времени</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {streams.map((stream) => (
                <Card key={stream.id} className="overflow-hidden hover:glow transition-all cursor-pointer group">
                  <div className="relative">
                    <img src={stream.thumbnail} alt={stream.game} className="w-full h-48 object-cover" />
                    {stream.live && (
                      <Badge className="absolute top-3 left-3 bg-destructive text-white live-pulse">
                        <Icon name="Circle" size={8} className="mr-1 fill-current" />
                        LIVE
                      </Badge>
                    )}
                    <Badge className="absolute top-3 right-3 bg-black/70 text-white">
                      <Icon name="Eye" size={14} className="mr-1" />
                      {stream.viewers.toLocaleString()}
                    </Badge>
                  </div>

                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="w-12 h-12 border-2 border-primary">
                        <AvatarImage src={stream.avatar} />
                        <AvatarFallback>{stream.streamer[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                          {stream.streamer}
                        </h3>
                        <p className="text-sm text-muted-foreground">{stream.game}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'chats' && (
          <>
            <div className="w-80 border-r border-border bg-card">
              <div className="p-4 border-b border-border">
                <h2 className="text-2xl font-bold mb-3">Чаты</h2>
                <Input placeholder="Поиск..." className="bg-background" />
              </div>

              <ScrollArea className="h-[calc(100vh-140px)]">
                <div className="p-2">
                  {chats.map((chat) => (
                    <Button
                      key={chat.id}
                      variant={selectedChat === chat.id ? 'secondary' : 'ghost'}
                      className="w-full justify-start mb-1 h-auto py-3 px-3"
                      onClick={() => setSelectedChat(chat.id)}
                    >
                      <Avatar className="w-10 h-10 mr-3">
                        <AvatarImage src={chat.avatar} />
                        <AvatarFallback>{chat.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 text-left">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold">{chat.name}</p>
                          {chat.unread > 0 && (
                            <Badge className="bg-primary text-primary-foreground">{chat.unread}</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                      </div>
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>

            <div className="flex-1 flex flex-col">
              <div className="p-4 border-b border-border bg-card">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold">Alex</h3>
                    <p className="text-sm text-secondary flex items-center">
                      <Icon name="Circle" size={8} className="mr-1 fill-current" />
                      Онлайн
                    </p>
                  </div>
                </div>
              </div>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-3 ${msg.user === 'Вы' ? 'flex-row-reverse' : ''}`}
                    >
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={msg.avatar} />
                        <AvatarFallback>{msg.user[0]}</AvatarFallback>
                      </Avatar>
                      <div className={msg.user === 'Вы' ? 'text-right' : ''}>
                        <div
                          className={`inline-block px-4 py-2 rounded-2xl ${
                            msg.user === 'Вы'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-foreground'
                          }`}
                        >
                          <p>{msg.message}</p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{msg.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-4 border-t border-border bg-card">
                <div className="flex gap-2">
                  <Input placeholder="Написать сообщение..." className="flex-1" />
                  <Button size="icon" className="glow">
                    <Icon name="Send" size={20} />
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}

        {activeSection === 'friends' && (
          <div className="flex-1 p-6">
            <div className="mb-6">
              <h1 className="text-4xl font-bold mb-2">Друзья</h1>
              <p className="text-muted-foreground">
                Онлайн — {friends.filter((f) => f.status !== 'offline').length} из {friends.length}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {friends.map((friend) => (
                <Card key={friend.id} className="p-4 hover:border-primary transition-all">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="w-14 h-14">
                        <AvatarImage src={friend.avatar} />
                        <AvatarFallback>{friend.name[0]}</AvatarFallback>
                      </Avatar>
                      <span
                        className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-card ${
                          friend.status === 'online'
                            ? 'bg-secondary glow-green'
                            : friend.status === 'playing'
                            ? 'bg-accent'
                            : 'bg-muted-foreground'
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold">{friend.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {friend.status === 'playing' && friend.game
                          ? `Играет в ${friend.game}`
                          : friend.status === 'online'
                          ? 'Онлайн'
                          : 'Не в сети'}
                      </p>
                    </div>
                    <Button size="icon" variant="ghost">
                      <Icon name="MessageCircle" size={20} />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'profile' && (
          <div className="flex-1 p-6">
            <div className="max-w-2xl mx-auto">
              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Профиль</h1>
              </div>

              <Card className="p-6 mb-6">
                <div className="flex items-start gap-6">
                  <Avatar className="w-24 h-24 border-4 border-primary glow">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>ME</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">MyUsername</h2>
                    <p className="text-muted-foreground mb-4">Геймер • Стример • Pro Player</p>
                    <div className="flex gap-2">
                      <Button size="sm">
                        <Icon name="Edit" size={16} className="mr-2" />
                        Редактировать
                      </Button>
                      <Button size="sm" variant="outline">
                        <Icon name="Share2" size={16} className="mr-2" />
                        Поделиться
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 mb-6">
                <h3 className="text-xl font-bold mb-4">Подключенные платформы</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#171a21] rounded flex items-center justify-center">
                        <Icon name="Gamepad" size={20} className="text-[#66c0f4]" />
                      </div>
                      <div>
                        <p className="font-semibold">Steam</p>
                        <p className="text-sm text-muted-foreground">Подключено</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Отключить
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#5865F2] rounded flex items-center justify-center">
                        <Icon name="MessageSquare" size={20} className="text-white" />
                      </div>
                      <div>
                        <p className="font-semibold">Discord</p>
                        <p className="text-sm text-muted-foreground">Не подключено</p>
                      </div>
                    </div>
                    <Button size="sm">Подключить</Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#9146FF] rounded flex items-center justify-center">
                        <Icon name="Tv" size={20} className="text-white" />
                      </div>
                      <div>
                        <p className="font-semibold">Twitch</p>
                        <p className="text-sm text-muted-foreground">Не подключено</p>
                      </div>
                    </div>
                    <Button size="sm">Подключить</Button>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Подписка Premium</h3>
                <div className="bg-gradient-to-r from-primary/20 to-accent/20 p-6 rounded-lg border border-primary/30">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon name="Zap" size={32} className="text-accent" />
                    <div>
                      <h4 className="text-lg font-bold">Улучши свой опыт</h4>
                      <p className="text-sm text-muted-foreground">
                        Получи доступ к эксклюзивным функциям
                      </p>
                    </div>
                  </div>
                  <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Icon name="Crown" size={20} className="mr-2" />
                    Оформить Premium
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;