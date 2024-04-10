# Проектная работа "Веб-ларек"
Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```




## UML схема с описанием классов используемых при реализации проект находится в корне проета. 
##    Называется файл UML диаграмма основных сущностей проекта 









## Типы данных и интерфейски использующиеся в проекте.
Посмотреть список всех типов данных и интрфейсов можно а папке /types/index.ts

Типы данных
```
 type Url = string - тип данных подсказка, для URL адресов

 type Text = string; - тип данных подсказка Текст
 type Cost = number; - тип данных подсказка Стоимость

 type ChooseItems = Pick<IBaseItem, 'id' | 'name' | 'price' | 'index'> - тип данных описывающий выборку свойтсв из интерфеса  IBaseItem
 type PayMethod = 'cash' | 'card' - тип данных описывающий способ оплаты

 type FormErrors = Partial<Record<keyof IOrder, string>>; -- тип данных описывающий ошибки формы

 Этот тип данных описывает данные при получении коллекции карточек
 type IApiListResp<Type> = {
  total: number,
  items: Type[]
}
```
Интерфейсы:
Данный интерфейс описывает форму заказа
```
interface IOrder {
    payment: PayMethod;
    phone: Text;
    email: Text;
    address: Text;
    totalCost: Cost;
}

Данный интерфейс описывает объект отправляемый на сервер при заказе
```
interface IPostOrder extends IOrder {
  items: string[]
}
``` 

Данный интерфейс описывает успешный заказ
```
interface IOrderResult {
  id: string;
  total: Cost;
}
```

Интерфейс описыающий состояние поля Формы 
```
interface IFormState {
    valid: boolean;
    errors: string[];
}
```


## Описание сущностей проекта

## Базовые сущности 

### Класс Model<T>
Это базовый абстракнтый класс который предназначен что бы отличать её от остальных объктов c данными.
Данная абстракция является дженерик типом,  где <T> - тип обрабатываемых данных.

Имеет свойста:
1. data: Partial<T> - необязательные свойста данных
2. events: IEvents - события 
Имеет методы:
1. emitChange(event: string, payload?: object) - предназначен для отслеживания изменение в данных Модели. Принемает как аргумент событие и опционально данные.

### Класс Api
Это базовый класс предназначенный для работы с серверными данными

имеет свойства:
1. baseUrl- Uri для обращения к серверу
2. options - объект с параметрами

Имеет методы:
1. get(uri: string) - для получения данных . Принемает uri сервера
2. post(uri: string, data: object, method: ApiPostMethods = 'POST') - для отправки данных. Принимает uri для обращения, передаваемый объект с данными и метод передечи (по умолчанию POST);

### Класс View<T>

Это базовый класс для работы с отображением на странице. В T принимает тип данных с которыми будет работыть.

В конструктор передаём одно защищенное и "только для чтения" свойство container - это HTML элемент в котором мы будем отображать какой то контент.

Имеет следующие методы:
1. toggleClass() - метод служащий для переключения класса у элемента
если класс есть - убирает его если нет - добавляет. принимет как аргументы 
элемент для которого нужно изменить класс, класс который нужно изменять, опциональное
2. setText- метод для установки текста в элемент. Принимает HTML элемент и текст
3. setDisabled() - метод для управления блокировкой у элемента
4. setHidden() - метод для скрытия элемента
5. setVisible() - метод для отобажения элемента
6. setImage() - метод для установки изображения в элемент
7. render(data?: Partial<T>) - метот для сборки элемента, возвращяет контейнес с переданными данными объекта


## Классы для работы с данными
### Класс ApiLarek

Наследует класс Api и реализует интерфейс IApi. 

```interface IApi {
  cdn: string;
  getItem: (id:string) => Promise<IBaseItem>;
  getLots: () => Promise<IBaseItem[]>;
  takeOrder: (order: IOrder) => Promise<IOrderResult>
}
```

### Класс LotItem
Этот класс реализует данные карточки, наследует абстрактный класс Model с интерфейсом IBaseItem. Нужен для получения типизированного объекта карточки

    ```
    interface IBaseItem {
    id: string;
    description?: Text;
    image: Url;
    name: Text;
    category: Text;
    price: Cost | null;
    button: boolean;
    index?: number;
    }

    ```
    ### Класс AppData

Данный класс предназначен для для работы с данными на странице, он наследует Model с интерфейсом IBaseItem и реализует интерфейс 
    ```
    interface AppState {
    catalog: ICard[];
    basket: ChooseItems[];
    preview: string | null;
    order: IOrder | null;
    formErrors: FormErrors;

    setCatalog(items: ICard[]):void;
    setPreview(item: IBaseItem): void;
    buyItem(item: IBaseItem): void;
    deleteItem(id:string):void;
    checkChoose(id: string): boolean;
    getBusket():HTMLElement;
    clearBasket():void;
    getResult(): Cost;
    setOrder(): IOrder;
    choosePay(value:Text): void;
    setAdress(value: Text): void;
    setContact(field: keyof Pick<IOrder, 'email' | 'phone'>, value: string): void
    clearOrder(): void;
    checkDelyveryReady(): void;
    checkOrderReady(): void;
    validataDelyvery(): void;
    validateContact(): void;
    }
    ```

Благодаря своим методам он может обрабатывать поступающую информацию что бы в Презенторе можно было объеденить  
Посмотреть его методы можно на UML схеме



## Классы для работы с отображением 

 ### Переиспользуемые сущности
 ### Класс Basket
 Класс корзины, наследует класс View c интерфейсом IBasket
    Предназначен для отрисовки корзины

    ```
    interface IBasket {
    items: HTMLElement[];
        total: number;
    }
    ```

### Congratulate 
Класс сообщения об успешной оплате
Реализует и интерфейс 
    ```
    interface ICongradulateWindow {
    finnlyCoast: HTMLParagraphElement;
    closeButton: HTMLButtonElement;
    setCoast(value: Cost):void;
    closeWindow():void;
    }
    ```

### Класс PopUp
Класс попапа, окна на котором будет размещаться подробнрая информация о товаре, корзина, форма заказа и тип
наследует класс View.
и реализует интерфейс 
    ```
    interface IModal {
    _content: HTMLElement;
    closeButton: HTMLButtonElement;
    nextButton: HTMLButtonElement;

    open(): void;
    close(): void;
    render(): void

    }
    ```


### Класс Form 
    Шаблонный класс реализующий форму наследует Базовый класс View c интерфейсом 
    ```
    interface IFormState {
    valid: boolean;
    errors: string[];
    }
    ```

### Классы Delyvery и Contact
    Наследуют класс Form c типом данных IOrder
    Предназначены для реализации заполнения формы заказа.
    Обладают сеттерами для установки значений в соответствующие поля заказа.

    ```
    interface IOrder {
        payment: PayMethod;
        phone: Text;
        email: Text;
        address: Text;
        totalCost: Cost;
    }

    ```



### Класс Page 
Шаблонный класс для работы с отображение главной страницы
наследует View с типом данных IPage

    ```
    interface IPage {
    counter: number;
    catalog: HTMLElement[];
    locked: boolean;
    }
    ```



### Класс Card
Класс для реализации отображения карточки
Наследует класс View с типом данных ICard

    ```
    interface ICard extends IBaseItem {
    button: HTMLElement;
    }
    ```

### Класс ChooseItem
Класс для реализации товаров в корзине
Наследует класс View с типом данных ChooseItems

```
 type ChooseItems = Pick<IBaseItem, 'id' | 'name' | 'price' | 'index'>
``` 