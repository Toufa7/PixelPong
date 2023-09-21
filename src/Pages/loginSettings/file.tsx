const Avatars = () => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    console.log(selectedIndex)
    const avatarSelector = (index: number) => {
      setSelectedIndex(index);
    };

  return (
    <>
      <div className="avatars">
        <img
          onClick={() => avatarSelector(0)}
          src={appel}
          className={selectedIndex === 0 ? 'selected' : ''}
        />
        <img
          onClick={() => avatarSelector(1)}
          src={appel}
          className={selectedIndex === 1 ? 'selected' : ''}
        />
        <img
          onClick={() => avatarSelector(2)}
          src={appel}
          className={selectedIndex === 2 ? 'selected' : ''}
        />
      </div>
      <div className="avatars">
        <img
          onClick={() => avatarSelector(3)}
          src={appel}
          className={selectedIndex === 3 ? 'selected' : ''}
        />
        <img
          onClick={() => avatarSelector(4)}
          src={appel}
          className={selectedIndex === 4 ? 'selected' : ''}
        />
        <img
          onClick={() => avatarSelector(5)}
          src={appel}
          className={selectedIndex === 5 ? 'selected' : ''}
        />
      </div>
    </>
  );
};
