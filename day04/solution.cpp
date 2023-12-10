#include <fstream>
#include <iostream>
#include <string>
#include <vector>
#include <cmath>

void firstProblem(std::vector<std::string> &lines)
{
    int solution = 0;

    std::string startDelimiter = ": ";
    std::string cardDelimiter = " | ";
    std::string numbersDelimiter = " ";

    for (int i = 0; i < lines.size(); i++)
    {
        std::string line = lines[i];

        for (int k = 0; k < line.length() - 1; k++)
        {
            if (line[k] == ' ' && line[k + 1] == ' ')
            {
                line.replace(k + 1, 1, "0");
            }
        }

        line.erase(0, line.find(startDelimiter) + startDelimiter.length());

        std::string winningNumbers = line.substr(0, line.find(cardDelimiter));
        line.erase(0, line.find(cardDelimiter) + cardDelimiter.length());
        std::string cardNumbers = line;

        std::vector<std::string> winningNumbersVector;
        std::vector<std::string> cardNumbersVector;
        size_t pos = 0;

        while ((pos = winningNumbers.find(numbersDelimiter)) != std::string::npos)
        {
            winningNumbersVector.push_back(winningNumbers.substr(0, pos));
            winningNumbers.erase(0, pos + numbersDelimiter.length());
        }

        while ((pos = cardNumbers.find(numbersDelimiter)) != std::string::npos)
        {
            cardNumbersVector.push_back(cardNumbers.substr(0, pos));
            cardNumbers.erase(0, pos + numbersDelimiter.length());
        }

        winningNumbersVector.push_back(winningNumbers);
        cardNumbersVector.push_back(cardNumbers);

        int matches = 0;

        for (int j = 0; j < winningNumbersVector.size(); j++)
        {
            for (int k = 0; k < cardNumbersVector.size(); k++)
            {
                if (winningNumbersVector[j] == cardNumbersVector[k])
                {
                    matches++;
                }
            }
        }

        if (matches >= 1)
        {
            solution += std::pow(2, matches - 1);
        }
    }

    std::cout << solution << std::endl;
}

void secondProblem(std::vector<std::string> &lines)
{
    int solution = 0;

    std::string startDelimiter = ": ";
    std::string cardDelimiter = " | ";
    std::string numbersDelimiter = " ";

    std::vector<int> cards;
    for (int i = 0; i < lines.size(); i++)
    {
        cards.push_back(1);
    }

    for (int i = 0; i < lines.size(); i++)
    {
        std::string line = lines[i];

        for (int k = 0; k < line.length() - 1; k++)
        {
            if (line[k] == ' ' && line[k + 1] == ' ')
            {
                line.replace(k + 1, 1, "0");
            }
        }

        line.erase(0, line.find(startDelimiter) + startDelimiter.length());

        std::string winningNumbers = line.substr(0, line.find(cardDelimiter));
        line.erase(0, line.find(cardDelimiter) + cardDelimiter.length());
        std::string cardNumbers = line;

        std::vector<std::string> winningNumbersVector;
        std::vector<std::string> cardNumbersVector;
        size_t pos = 0;

        while ((pos = winningNumbers.find(numbersDelimiter)) != std::string::npos)
        {
            winningNumbersVector.push_back(winningNumbers.substr(0, pos));
            winningNumbers.erase(0, pos + numbersDelimiter.length());
        }

        while ((pos = cardNumbers.find(numbersDelimiter)) != std::string::npos)
        {
            cardNumbersVector.push_back(cardNumbers.substr(0, pos));
            cardNumbers.erase(0, pos + numbersDelimiter.length());
        }

        winningNumbersVector.push_back(winningNumbers);
        cardNumbersVector.push_back(cardNumbers);

        int matches = 0;

        for (int j = 0; j < winningNumbersVector.size(); j++)
        {
            for (int k = 0; k < cardNumbersVector.size(); k++)
            {
                if (winningNumbersVector[j] == cardNumbersVector[k])
                {
                    matches++;
                }
            }
        }

        for (int j = 0; j < matches; j++)
        {
            if (i + j + 1 < cards.size())
            {
                cards[i + j + 1] += cards[i];
            }
        }
    }

    for (int i = 0; i < cards.size(); i++)
    {
        solution += cards[i];
    }

    std::cout << solution << std::endl;
}

int main()
{
    std::ifstream myFile;

    myFile.open("input.txt");

    if (!myFile.is_open())
    {
        std::cout << "Unable to open file" << std::endl;
        return 1;
    }

    std::string line;
    std::vector<std::string> lines;

    while (std::getline(myFile, line))
    {
        if (line.empty())
        {
            break;
        }

        lines.push_back(line);
    }

    firstProblem(lines);
    secondProblem(lines);

    return 0;
}
