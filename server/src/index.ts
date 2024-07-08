const helloYou = (name) => {
    name = name || 'you';
    console.log('hello' + name + '!');
};

helloYou('world'); // hello world!
