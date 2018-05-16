function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Pointy Settings</Text>}>
         <Select
          label="Default Game"
          settingsKey="defaultGame"
          options={[
            {name: "None"},
            {name: "Disc Golf"},
            {name: "Golf"}
          ]}
        />
        <Select
          label="Default Course"
          settingsKey="defaultCourse"
          options={[
            {name: "None"},
            {name: "Flat Rocks (A)"},
            {name: "Flat Rocks (B)"}
          ]}
        />

        <AdditiveList
          title="Players"
          settingsKey="players"
          maxItems="6"
          addAction={
            <TextInput
              title="Add a Player"
              label="Player Name"
              placeholder="Player Name"
              action="Add Player"              
            />
          }
        />
        
        
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);
