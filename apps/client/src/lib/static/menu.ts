import type { MenuZoneType } from "@siberiana/schemas";

export interface menusType {
  ru: MenuZoneType;
  en: MenuZoneType;
}

export const menus: menusType = {
  ru: [
    {
      id: 1,
      name: "Коллекции",
      url: "collections",
      description: "Изучай наследие Енисейской Сибири",
      image: "Library",
    },
    {
      id: 1,
      name: "Платформа",
      list: [
        {
          id: 2,
          name: "О нас",
          url: "about",
          description: "Информация о миссии, цели, команде проекта",
          image: "Users",
        },
        {
          id: 3,
          name: "Организации",
          url: "organizations",
          description:
            "Консорциум, а также места, имеющие важное культурное, природное и историческое значение",
          image: "Landmark",
        },
        {
          id: 4,
          name: "Лицензии",
          url: "licenses",
          description: "Информация о лицензиях и правах использования контента",
          image: "FileBadge2",
        },
        {
          id: 5,
          name: "Помощь проекту",
          url: "help",
          description: "Вы можете отправить пожертвование проекту",
          image: "HelpingHand",
        },
      ],
    },
    {
      id: 2,
      name: "Ресурсы",
      list: [
        {
          id: 6,
          name: "Проекты",
          url: "projects",
          description: "Сторонние проекты, стоящие вашего внимания",
          image: "Boxes",
        },
        {
          id: 7,
          name: "Аналитика",
          url: "analytics",
          description:
            "Аналитический дашборд, позволяющий узнать о конкретных цифрах коллекций",
          image: "BarChart4",
        },
        {
          id: 8,
          name: "Блог",
          url: "blog",
          description:
            "Наши исследователи публикуют здесь интересные статьи о культуре и не только",
          image: "ScrollText",
        },
        {
          id: 9,
          name: "Сервисы",
          url: "services",
          description:
            "Ряд наших сервисов, которые помогут вам погрузиться еще больше в культурное, природное и историческое наследие",
          image: "CircuitBoard",
        },
      ],
    },
  ],
  en: [
    {
      id: 19,
      name: "Collections",
      url: "collections",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
      image: "Library",
    },
    {
      id: 3,
      name: "Platform",
      list: [
        {
          id: 20,
          name: "About",
          url: "about",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
          image: "Users",
        },
        {
          id: 21,
          name: "Organizations",
          url: "organizations",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
          image: "Landmark",
        },
        {
          id: 13,
          name: "Licenses",
          url: "licenses",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
          image: "FileBadge2",
        },
        {
          id: 14,
          name: "Help the project",
          url: "help",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
          image: "HelpingHand",
        },
      ],
    },
    {
      id: 4,
      name: "Resources",
      list: [
        {
          id: 15,
          name: "Projects",
          url: "projects",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
          image: "Boxes",
        },
        {
          id: 16,
          name: "Analytics",
          url: "analytics",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
          image: "BarChart4",
        },
        {
          id: 17,
          name: "Blog",
          url: "blog",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
          image: "ScrollText",
        },
        {
          id: 18,
          name: "Services",
          url: "services",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
          image: "CircuitBoard",
        },
      ],
    },
  ],
};
